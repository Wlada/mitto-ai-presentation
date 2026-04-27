import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SlideService } from '../slide.service';

@Component({
  selector: 'app-slide-layout',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './slide-layout.html',
  styleUrl: './slide-layout.scss',
})
export class SlideLayout {
  protected readonly slides = inject(SlideService);

  protected onPrev(): void {
    this.slides.previous();
  }

  protected onNext(): void {
    this.slides.next();
  }

  protected goTo(n: number): void {
    this.slides.goTo(n);
  }

  @HostListener('document:keydown', ['$event'])
  protected handleKey(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }
    switch (event.key) {
      case 'ArrowRight':
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this.slides.next();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.slides.previous();
        break;
      case 'Home':
        event.preventDefault();
        this.slides.goTo(1);
        break;
      case 'End':
        event.preventDefault();
        this.slides.goTo(this.slides.total());
        break;
    }
  }
}
