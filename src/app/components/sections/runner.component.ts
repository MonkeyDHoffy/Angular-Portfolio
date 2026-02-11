import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { PageContainerComponent } from '../layout/page-container.component';

const DEFAULT_GAME_WIDTH = 360;
const GROUND_OFFSET = 10;
const PLAYER_LEFT = 56;
const PLAYER_SIZE = 10;
const GRAVITY = 1800;
const JUMP_VELOCITY = 560;
const MAX_JUMP_HEIGHT = 36;
const OBSTACLE_WIDTH = 10;
const OBSTACLE_HEIGHT = PLAYER_SIZE * 1.6;
const BASE_OBSTACLE_SPEED = 90;
const MAX_OBSTACLE_SPEED = 280;
const GAP_MIN = 140;
const GAP_MAX = 260;

interface Obstacle {
  id: number;
  x: number;
  passed: boolean;
  hit: boolean;
}

const randomGap = () => GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN);
const createObstacle = (x: number, id: number): Obstacle => ({ id, x, passed: false, hit: false });

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [CommonModule, PageContainerComponent],
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.css']
})
export class RunnerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('trackRef') trackRef?: ElementRef<HTMLDivElement>;

  player = { y: 0, vy: 0 };
  obstacles: Obstacle[] = [createObstacle(DEFAULT_GAME_WIDTH, 0)];
  score = 0;

  readonly PLAYER_LEFT = PLAYER_LEFT;
  readonly PLAYER_SIZE = PLAYER_SIZE;
  readonly GROUND_OFFSET = GROUND_OFFSET;
  readonly OBSTACLE_WIDTH = OBSTACLE_WIDTH;
  readonly OBSTACLE_HEIGHT = OBSTACLE_HEIGHT;

  private rafId = 0;
  private lastTime = 0;
  private nextGap = randomGap();
  private nextId = 1;
  private gameWidth = DEFAULT_GAME_WIDTH;
  private resizeObserver?: ResizeObserver;
  private boundUpdateWidth: (() => void) | null = null;

  ngAfterViewInit(): void {
    this.updateWidth();
    this.setupResizeWatcher();
    this.startLoop();
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.boundUpdateWidth) window.removeEventListener('resize', this.boundUpdateWidth);
  }

  handleJump(): void {
    if (this.player.y > 0) return;
    this.player = { y: this.player.y, vy: JUMP_VELOCITY };
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this.handleJump();
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.handleJump();
  }

  trackById(_: number, obstacle: Obstacle): number {
    return obstacle.id;
  }

  private startLoop(): void {
    this.rafId = requestAnimationFrame((time) => this.loop(time));
  }

  private loop(time: number): void {
    if (!this.lastTime) this.lastTime = time;

    const delta = Math.min((time - this.lastTime) / 1000, 0.032);
    this.lastTime = time;

    let vy = this.player.vy - GRAVITY * delta;
    let y = this.player.y + vy * delta;

    if (y <= 0) {
      y = 0;
      vy = 0;
    }

    if (y >= MAX_JUMP_HEIGHT) {
      y = MAX_JUMP_HEIGHT;
    }

    this.player = { y, vy };

    const playerLeftEdge = PLAYER_LEFT;
    const playerRightEdge = PLAYER_LEFT + PLAYER_SIZE;
    const playerBottom = GROUND_OFFSET + this.player.y;
    const playerTop = playerBottom + PLAYER_SIZE;
    const obstacleBottom = GROUND_OFFSET;
    const obstacleTop = obstacleBottom + OBSTACLE_HEIGHT;

    let collision = false;
    let gained = 0;

    const obstacleSpeed = Math.min(MAX_OBSTACLE_SPEED, BASE_OBSTACLE_SPEED + this.score * 10);

    let updated = this.obstacles
      .map((obstacle) => {
        const nextX = obstacle.x - obstacleSpeed * delta;
        const obstacleRight = nextX + OBSTACLE_WIDTH;
        let hit = obstacle.hit;
        const overlapX = playerRightEdge > nextX && playerLeftEdge < obstacleRight;
        const overlapY = playerTop > obstacleBottom && playerBottom < obstacleTop;

        if (!hit && overlapX && overlapY) {
          hit = true;
          collision = true;
        }

        let passed = obstacle.passed;
        if (!passed && obstacleRight < playerLeftEdge) {
          passed = true;
          if (!hit) {
            gained += 1;
          }
        }

        return { ...obstacle, x: nextX, passed, hit };
      })
      .filter((obstacle) => obstacle.x > -OBSTACLE_WIDTH);

    const tail = updated.at(-1);
    const tailX = tail ? tail.x : this.gameWidth;

    if (tailX < this.gameWidth - this.nextGap) {
      updated = [...updated, createObstacle(this.gameWidth, this.nextId)];
      this.nextId += 1;
      this.nextGap = randomGap();
    }

    if (!updated.length) {
      updated = [createObstacle(this.gameWidth, this.nextId)];
      this.nextId += 1;
      this.nextGap = randomGap();
    }

    this.obstacles = updated;

    if (collision) {
      if (this.score !== 0) {
        this.score = 0;
      }
    } else if (gained) {
      this.score += gained;
    }

    this.startLoop();
  }

  private setupResizeWatcher(): void {
    const node = this.trackRef?.nativeElement;
    if (!node) return;

    this.boundUpdateWidth = () => this.updateWidth();

    if (typeof ResizeObserver === 'function') {
      this.resizeObserver = new ResizeObserver(this.boundUpdateWidth);
      this.resizeObserver.observe(node);
    } else {
      window.addEventListener('resize', this.boundUpdateWidth);
    }
  }

  private updateWidth(): void {
    const node = this.trackRef?.nativeElement;
    if (!node) return;

    const nextWidth = Math.max(node.clientWidth, 240);
    if (Math.abs(nextWidth - this.gameWidth) < 1) return;
    this.gameWidth = nextWidth;

    this.obstacles = this.obstacles.map((obstacle) => ({
      ...obstacle,
      x: Math.min(obstacle.x, nextWidth)
    }));
  }
}
