import React from 'react';
import Data from '../Components/Data';
import SessionManagement from './SessionManagement';
import BackButton from './BackButton';
import UserManagement   from './UserManagement'
import StudyManagement from './StudyManagement';
import GroupManagement from './GroupManagement'
import CenterManagement from './CenterManagement'


const ChildSidebar = ({ childrenProp }) => {
    let content;

    switch (childrenProp) {
        case "dash":
            content = <Data />;
            break;
        case "sessm":
            content = <SessionManagement />;
            break;
        case "studym":
            content = <StudyManagement />;
            break;
        case "userm":
            content = <UserManagement/>;
            break;
        case "grpm":
            content = <GroupManagement />;
            break;
        case "centerm":
            content = <CenterManagement />;
            break;
        default:
            content = <Data />;
            break;
    }

    return (
        <div className="p-2 sm:ml-64 bg-gray-200 ">
            <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <BackButton />
                {content}
            </div>
        </div>
    );
};

export default ChildSidebar;
