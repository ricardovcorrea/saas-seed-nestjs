import { Theme } from "./theme.entity";

export class DTOTheme {
    id: string;
    primary: string;
    secondary: string;
    isActive: boolean;

    constructor(model: Theme) {
        const { id, primary, secondary, isActive } = model;

        this.id = id;
        this.primary = primary;
        this.secondary = secondary;
        this.isActive = isActive;
    }
}