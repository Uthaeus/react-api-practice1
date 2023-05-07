import { Outlet } from "react-router";

import MainNavigation from "../navigation/main-navigation";

function MeetupLayout() {
    return (
        <div>
        <MainNavigation />
        <Outlet />
        </div>
    );
}

export default MeetupLayout;