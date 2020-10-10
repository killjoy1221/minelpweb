// eslint-disable-next-line
import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { getMods, getModDetail } from "./modsService";

const { PUBLIC_URL } = process.env;

function ModList() {
    const { data, isLoading, error } = useQuery("mods", getMods);

    return (
        <div>
            <div hidden={!isLoading}>Loading...</div>
            <div hidden={isLoading || !error}>
                Error! <span style={{ fontSize: "8pt" }}>See console</span>
            </div>
            {data?.mods.map((m) => (
                <div key={m.name}>
                    <a href={`${PUBLIC_URL}/mods/${m.id}`}>{m.name}</a>
                </div>
            ))}
        </div>
    );
}

function Mod(props: { match: any }) {
    const { id } = props.match.params;
    const { data, isLoading, error } = useQuery("mod-" + id, getModDetail(id));

    console.log(data);

    useEffect(() => {
        document.title = "MineLittlePony - Mods";
    });

    return (
        <>
            <div hidden={!isLoading}>Loading...</div>
            <div hidden={isLoading || !error}>Error! Does the mod exist?</div>
            <div hidden={!data}>{data?.name}</div>
        </>
    );
}

function Mods() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} component={ModList} />
            <Route exact path={`${path}/:id`} component={Mod} />
        </Switch>
    );
}

export default Mods;
