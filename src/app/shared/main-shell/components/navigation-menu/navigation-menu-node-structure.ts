// Justification: All the classes are thightly related to each other.
// eslint-disable-next-line max-classes-per-file
export interface INavigationMenuNodeDefinition {
  icon?: string;
  label: string;
  children?: INavigationMenuNodeDefinition[];
  route: string;
}

export class NavigationMenuNode implements INavigationMenuNodeDefinition {
  public icon?: string;
  public label: string;
  public children?: NavigationMenuNode[];
  public route: string;

  constructor(definition: INavigationMenuNodeDefinition) {
    this.icon = definition.icon;
    this.label = definition.label;

    if (definition.children) {
      this.children = definition.children.map((child: INavigationMenuNodeDefinition) => new NavigationMenuNode(child));
    }

    this.route = definition.route;
  }
}

export class NavigationMenuStructure {
  public root: NavigationMenuNode;

  constructor(definition: INavigationMenuNodeDefinition) {
    this.root = new NavigationMenuNode(definition);
  }
}
