// place files you want to import through the `$lib` alias in this folder.

import { writable } from "svelte/store";

export const SectionLinks = writable([
    {
        section: "Section 1",
        links: [{
            link: "#",
            names: "Test 1"
        },
        {
            link: "#",
            names: "Test 2"
        },
        {
            link: "#",
            names: "Test 3"
        }]
    },
    {
        section: "Section 2",
        links: [{
            link: "#",
            names: "Test 4"
        },
        {
            link: "#",
            names: "Test 5"
        },
        {
            link: "#",
            names: "Test 6"
        }]
    },
    {
        section: "Section 3",
        links: [{
            link: "#",
            names: "Test 7"
        },
        {
            link: "#",
            names: "Test 8"
        },
        {
            link: "#",
            names: "Test 9"
        }]
    }
])

export const NavLinks = [
    {
        link: "#",
        name: "Test 1"
    },
    {
        link: "#",
        name: "Test 2"
    },
    {
        link: "#",
        name: "Test 3"
    },
]