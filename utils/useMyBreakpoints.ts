import { breakpointsTailwind } from "@vueuse/core";

export default function () {
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller("sm");
    const isLaptop = breakpoints.between("sm", "xl");
    const isDesktop = breakpoints.greater("xl");

    return { isMobile, isLaptop, isDesktop, breakpoints };
}
