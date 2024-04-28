import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PoolProvider } from './Context/PoolsContext';
import { SubjectProvider } from './Context/SubjectsContext';
import { UserProvider } from './Context/UsersContext';
import { InstitutionProvider } from './Context/InstitutionsContext';
import { MySubjectsProvider } from './Context/MySubjectsContext';
import { InstructorsProvider } from './Context/InstructorsContext';
//import { CurrentUserProvider } from './Context/CurrentUserContext';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <PoolProvider>
                <InstitutionProvider>
                  <MySubjectsProvider>
                    <SubjectProvider>
                      <InstructorsProvider>
                        <UserProvider>
                        <App />
                        </UserProvider>
                      </InstructorsProvider>
                    </SubjectProvider>
                  </MySubjectsProvider>
                </InstitutionProvider>
              </PoolProvider>
            </UserProvider>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>
);
