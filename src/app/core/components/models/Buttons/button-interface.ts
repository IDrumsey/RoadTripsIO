export interface ButtonInterface {
    onClick(): void;
    onIconMouseEnter(): void;
    onIconMouseExit(): void;
    hide(): void;
    show(): void;
    select(foregroundColor: string, backgroundColor?: string): void;
    unselect(): void;
}
