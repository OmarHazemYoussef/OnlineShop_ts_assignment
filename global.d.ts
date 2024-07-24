declare global {
  interface Window {
    viewProduct: (id: number) => void;
    addToCart: (product: any) => void;
    updateQuantity: (id: number, delta: number) => void;
    removeFromCart: (id: number) => void;
  }
}

export {};