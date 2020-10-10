// eslint-disable-next-line
import React from "react";
import { useHistory } from "react-router-dom";

export function InternalLink(props: { href: string; children: any }) {
    const { href, children } = props;

    const history = useHistory();

    const onClick = () => {
        history.push(href);
    };

    return <span onClick={onClick}>{children}</span>;
}
