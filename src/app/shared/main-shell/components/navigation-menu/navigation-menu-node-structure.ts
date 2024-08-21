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
  public children: NavigationMenuNode[] = [];
  public hasChildren: boolean = false;
  /**
   * The route the node will navigate to.
   * It will always be the first child route if there are children.
   */
  public route: string;
  /**
   * This baseRoute keeps the original route of the node.
   * This is needed to check against the current url route to detemine the active section.
   */
  public baseRoute: string = '';

  constructor(definition: INavigationMenuNodeDefinition) {
    this.icon = definition.icon;
    this.label = definition.label;

    if (definition.children && definition.children.length > 0) {
      this.hasChildren = true;
      this.children = definition.children.map((child: INavigationMenuNodeDefinition) => new NavigationMenuNode(child));
    }

    this.route = definition.route;
    this.baseRoute = definition.route;

    // We want to default to the first child route if there are children
    if (this?.children.length > 0) {
      this.route = this.children[0].route;
    }
  }
}

export class NavigationMenuStructure {
  public root: NavigationMenuNode;

  constructor(definition: INavigationMenuNodeDefinition) {
    this.root = new NavigationMenuNode(definition);
  }
}
