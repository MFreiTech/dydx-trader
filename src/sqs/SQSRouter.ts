import { ISQSRoute } from '@entities';

class SQSRouter {
  private _routes: ISQSRoute[];
  constructor() {
    this._routes = [];
  }

  public createRoute(topic: string, handler: (body: any) => Promise<any>) {
    const route: ISQSRoute = {
      topic,
      handler
    };

    // TODO: Validar existencia de "topic" en las rutas
    // if (this._routes.find((route) => route.topic === topic)) {
    //   // if route exists -> override it
    //   this._routes[`${topic}`]
    // }

    this._routes.push(route);
  }

  public get routes() {
    return this._routes;
  }
}

export default SQSRouter;
