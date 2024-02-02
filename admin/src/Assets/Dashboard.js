import { FaUserLock, FaBook, FaUsers, FaUserGraduate, FaBuilding } from 'react-icons/fa';

export const dashboard = [
    {
        id: 1,
        key: "welcome",
        name: "Dashboard",
        redirect: "/dashboard",
        icon: <FaUserLock />
    },
    {
        id: 2,
        key: "session",
        name: "Session Management",
        redirect: "/session-management",
        icon: <FaUserLock />
    },
    {
        id: 3,
        name: "Study Management",
        redirect: "/study-management",
        icon: <FaBook />
    },
    {
        id: 4,
        name: "User Management",
        redirect: "/user-management",
        icon: <FaUsers />
    },
    {
        id: 5,
        name: "Group Management", redirect: "/group-management",
        icon: <FaUserGraduate />
    },
    {
        id: 6,
        name: "Center Management",
        redirect: "/center-management",
        icon: <FaBuilding />
    },
    {
        id: 7,
        name: "Data Purge",
        redirect: "",
        subItems: [
            {
                id: 71,
                name: "Rules",
                redirect: "/rules",
            },
            {
                id: 72,
                name: "Logs",
                redirect: "/logs",
            }
        ]
    },
    {
        id: 8,
        name: "Report Template",
        redirect: "/report-template",
    },
    {
        id: 9,
        name: "Audit Trail",
        redirect: "/audit-trail",
    },
    {
        id: 10,
        name: "Alerts",
        redirect: "/alerts",
    }


]
