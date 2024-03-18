import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const QuestionPool = () =>
{
    const pathnames = useLocation().pathname.split('/');
    const id = pathnames[pathnames.length - 1];

    const navigate = useNavigate();
    const handleAddQuestionPool = async() =>
    {
        navigate(`CreateQuestion`);
    };

    return (
        <div>
            <button onClick={() => handleAddQuestionPool()}>Create Question</button>
        </div>
    );
}

export default QuestionPool;