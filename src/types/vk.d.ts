interface Window {
  VK?: {
    Widgets: {
      Group: (elementId: string, options: {
        mode: number;
        wide?: number;
        width?: string | number;
        height?: string;
        color1?: string;
        color2?: string;
        color3?: string;
      }, groupId: number) => void;
    };
  };
}
