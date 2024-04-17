import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';
import { msQuestionApi } from '../../Services/AxiosService';

const Breadcrumbs = () => {
  const location = useLocation();
  const { questionPoolId } = useParams();
  const entirePath = location.pathname.split('/').filter((path) => path !== '');
  const paths = entirePath.slice(0, entirePath.length + 1);
  const [questionPoolName, setQuestionPoolName] = useState('');
  const isInstructorPage = paths[0] === 'Instructor'; 


  const fetchQuestionPoolName = async () => {
    try {
      const response = await msQuestionApi(`/question-pool/${questionPoolId}`);
      const name = response.data.name;
      console.log(name)      
      setQuestionPoolName(name);
    } catch (error) {
      console.log("ef");
      console.error('Error fetching question pool name:', error);
    }
  };

  useEffect(() => {

    fetchQuestionPoolName();

  }, [questionPoolId]);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* Render Home breadcrumb only if it's not /Instructor/QuestionPools */}
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={styles.breadcrumb_separator}> &gt; </span>}
            {/* Display 'QuestionPools' as default if endpoint is /Instructor/ or /Instructor */}
            {(paths.length === 1 && paths[0] === 'Instructor' && index === 0) ? (
              <li className={styles.breadcrumb_item}>
                <Link to="/Instructor/QuestionPools">Question Pools</Link>
              </li> 
            ) : 
            (
              <li className={styles.breadcrumb_item}>
                <Link to={`/${paths.slice(0, index + 1).join('/')}`}>
                {index === paths.length - 1 && !isNaN(path) && paths[index - 1] === 'QuestionPools' ? (
        questionPoolName || path // Display question pool name if available, otherwise display parameter
      ) : (
        path
      )}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
