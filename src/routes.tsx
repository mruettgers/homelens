import React, { FunctionComponent, ReactNode } from 'react';
import DoorCam from './views/cctv/DoorCam';
import { Route, RouteComponentProps } from 'react-router';

export interface RouteConfig {
    [key: string]: any,
    path: string,
    exact?: boolean,
    title?: FunctionComponent,
    main?: FunctionComponent,
    children?: RouteConfig[],
    parent?: RouteConfig
}

export interface RouteComponentPropsWithRouteConfig extends RouteComponentProps {
    route: RouteConfig
}

export interface RouteRenderComponentProps {
    route: RouteConfig
}


const routes: RouteConfig[] = [
    {
        path: "/",
        exact: true,
        title: () => <div>Home</div>,
        main: () => <h2>Home</h2>,
        children: [
            {
                path: "/cctv",
                children: [
                    {
                        path: "/cctv/door/:trigger?",
                        exact: true,
                        title: () => <div>CCTV | Door</div>,
                        main: () => <DoorCam />
                    }
                ]
            }
        ]
    },
];


const renderRoutes = (routes: RouteConfig[], component: string | FunctionComponent<RouteRenderComponentProps>, parent?: RouteConfig, key: number = 0) => {
    const result: ReactNode[] = [];
    routes.forEach((route) => {
        const RouteComponent = typeof component === 'function' ? component : route[component];
        route.parent = parent;
        result.push(
            <Route
                key={key++}
                path={route.path}
                exact={route.exact}
                render={(props) => RouteComponent ? <RouteComponent
                    {...props}
                    route={route}
                /> : null}
            />
        );
        (route.children ? renderRoutes(route.children, component, route, key) : []).forEach(v => result.push(v));
    });
    return result;
}

export default {
    render: (component: string | FunctionComponent<RouteRenderComponentProps>) => {
        return renderRoutes(routes, component)
    }
}
