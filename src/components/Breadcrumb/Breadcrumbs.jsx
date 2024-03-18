import React from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ questionPoolName }) => {
  const {QuestionPoolName, QuestionId} = useParams();
  const location = useLocation();
  
  const pathnames = location.pathname.slice(1, location.pathname.length).split('/');
  console.log(pathnames);
  let arr = [];
  let newArr = [];
  const crumbs = pathnames.filter((crumb) => crumb !== '');
  
  const BuildLink = (newArr) =>
  {
    let link = "Instructor";
    for(let i = 0; i < newArr.length; i++)
    {
      if(newArr[i] === 'Question Pools')
      link =+ '/QuestionPools';
      if(newArr[i] === 'Question Pool' && newArr[i + 1] === 'Create Question')
      link =+ '/2';
      if(newArr[i] === 'Question Pools' && newArr[i + 1] === 'Create Question Pool')
      link =+ '/CreateQuestionPool/0';
      if(newArr[i] === 'Question Pools' && newArr[i + 1] === 'Edit Question Pool')
      link =+ '/EditQuestionPool/23';
      if(newArr[i] === 'Question Pools' && newArr[i + 2] === 'Create Question')
      link =+ '/CreateQuestion/0';
      if(newArr[i] === 'Question Pools' && newArr[i + 2] === 'Edit Question')
      link =+ '/EditQuestion/21';
    }
    console.log(link);
    return link;
  }
    
  
  useEffect(() => {
    //console.log(BuildLink(2));
  }, [location])
  
  for(let i = 0; i < crumbs.length; i++)
  {
    if(crumbs[i] === 'QuestionPools')
      arr.push('Question Pools')
    else if (crumbs[i] === 'CreateQuestionPool')
      arr.push('Create Question Pool')
    else if (crumbs[i] === 'EditQuestionPool')
      arr.push('Edit Question Pool')
    else if (crumbs[i - 1] === 'QuestionPools' && crumbs[i + 1] !== 'CreateQuestion' && crumbs[i + 1] !== 'EditQuestion')
      arr.push('Question Pool');
     else if (crumbs[i - 1] === 'QuestionPools' && (crumbs[i + 1] === 'CreateQuestion' || crumbs[i + 1] === 'EditQuestion'))
      arr.push('Question Pool');
    else if (crumbs[i] === 'CreateQuestion')
      arr.push('Create Question')
    else if (crumbs[i] === 'EditQuestion' && crumbs[i + 1] !== 0)
      arr.push('Edit Question')
    
  }
  
  console.log(arr)
  // console.log(arr)

  return (
    <nav aria-label="Breadcrumb">
      <ul className={styles.breadcrumb}>
        {
          arr?.slice(0, arr.length - 1).map((crumb, index) =>
          {
            newArr.push(crumb);
            return (
            
            <li key={index}>
                <NavLink to={`/${BuildLink(newArr)}`}>{crumb}</NavLink>
            </li>
            )
          })
        }
        <li><span>{arr[arr.length - 1]}</span></li>
      </ul>
    </nav>
  );
}


export default Breadcrumbs;
