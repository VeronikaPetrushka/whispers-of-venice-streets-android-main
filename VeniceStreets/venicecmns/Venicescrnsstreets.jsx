import Venicesharestreets from "./Venicesharestreets";

import Veniceblogstreets from "../venicescrns/Veniceblogstreets";
import Veniceinfostreets from "../venicescrns/Veniceinfostreets";
import Veniceloadstreets from "../venicescrns/Veniceloadstreets";
import Venicemapstreets from "../venicescrns/Venicemapstreets";
import Venicereadblogstreets from "../venicescrns/Venicereadblogstreets";
import Venicereadplacestreets from "../venicescrns/Venicereadplacestreets";
import Venicerecommendstreets from "../venicescrns/Venicerecommendstreets";
import Venicesavedstreets from "../venicescrns/Venicesavedstreets";

export const VeniceblogStreets = () => {
    return (
        <Venicesharestreets
            veniceroute={<Veniceblogstreets />}
        />
    )
};

export const VeniceinfoStreets = () => {
    return (
        <Venicesharestreets
            veniceroute={<Veniceinfostreets />}
        />
    )
};

export const VeniceloadStreets = () => {
    return (
        <Venicesharestreets
            veniceroute={<Veniceloadstreets />}
        />
    )
};

export const VenicemapStreets = () => {
    return (
        <Venicesharestreets
            veniceroute={<Venicemapstreets />}
        />
    )
};

export const VenicereadblogStreets = ({ route }) => {
    const { blog } = route.params;

    return (
        <Venicesharestreets
            veniceroute={<Venicereadblogstreets blog={blog} />}
        />
    )
};

export const VenicereadplaceStreets = ({ route }) => {
    const { place } = route.params;

    return (
        <Venicesharestreets
            veniceroute={<Venicereadplacestreets place={place} />}
        />
    )
};

export const VenicerecommendStreets = () => {
    return (
        <Venicesharestreets
            veniceroute={<Venicerecommendstreets />}
        />
    )
};

export const VenicesavedStreets = () => {
    return (
        <Venicesharestreets
            veniceroute={<Venicesavedstreets />}
        />
    )
};