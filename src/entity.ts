import Component from "./component.interface.js";
import GameObject from "./game-object.interface.js";

export default abstract class Entity implements GameObject {
    private name: string;
    private components: Component[];

    constructor(name: string) {
        this.name = name;
        this.components = [];
    }

    public addComponent(component: Component): void {
        // Avoid adding the same component twice (at least for the moment)
        if (!this.components.find((c: Component) => typeof c === typeof component)) {
            this.components.push(component);
        }
    }

    public update(): void {
        this.components.forEach((component: Component) => {
            component.update();
        });
    }

    public render(): void { }

}