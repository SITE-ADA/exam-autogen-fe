import React from 'react';
import '../Modals/AddInstRepModal.css';

const AddInstRepModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>

        <div className='add-inst-rep-hg'>
              <span>Add Institution Representative</span>
            </div>  

          <div className='content'>

            <div className='input-area'>
              <div className='group-usr-email'>

              <div className='username-area'>
                <label htmlFor=''>Username</label>
                <input className='input' placeholder="Username" type="text" name='username' id='username' autoComplete="off" />
              </div>

              <div className='email-area'>
                <label htmlFor='email'>Email</label>
                <input placeholder="Email" className='input' type="email" name='email' id='email' autoComplete="off"/>
              </div>

              </div>

              <div className='area'>
                <label htmlFor="phonenumber">Phone Number</label>
                <input placeholder="Phone number" className='input' type="tel" name='phonenumber' id='phonenumber' autoComplete="off"/>
              </div>

              <div className='area'>
                <label htmlFor="institution">Institution</label>
                <input placeholder="Institution" className='input' type="text" name='institution' id='institution' autoComplete="off" />
              </div>

              <div className='area'>
                <label htmlFor="password">Password</label>
                <input placeholder="Password"className='input' type="password" name='password' id='password' autoComplete="off" />
              </div>

              <div className='area'>
                <label htmlFor="rep-password">Repeat Password</label>
                <input placeholder="Repeat password" className='input' type="password" name='rep-password' id='rep-password' autoComplete="off" />
              </div>

            </div>
          </div>
          <div className='btn-container'>

            <button className='add_btn'>
              <span>Add</span>
            </button>
            
            <button onClick={onClose} className='cancel_btn'>
              <span>Cancel</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstRepModal;   