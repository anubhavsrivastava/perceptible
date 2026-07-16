export interface ViewOffset {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface PerceptorOptions {
  element?: HTMLElement | string;
  threshold?: number;
  viewOffset?: ViewOffset;
  subscribers?: Array<(event: any) => void>;
  spectators?: any[];
  scheduler?: any;
}

export default class Perceptor {
  constructor(element: HTMLElement | string, options?: PerceptorOptions);
  static create(element: HTMLElement | string, options?: PerceptorOptions): Perceptor;
  watch(): void;
  unwatch(): void;
  destroy(): void;
  observe(subscriber: (event: any) => void): void;
  unobserve(subscriber: (event: any) => void): void;
}
