import React from 'react';

const Modal = ({ open, onClose }) => {
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
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <form action="">
          <div className='content'>

            <div className='add-inst-rep-hg'>
              <p>Add Institution Representative</p>
            </div>
            
            <div className='input-area'>

              <div className='username'>
                <label htmlFor=''>Username</label>
                <input type="text" name='username' id='username'/>
              </div>

              <div className='email'>
                <label htmlFor=''>Email</label>
                <input type="email" name='email' id='email'/>
              </div>

              <div className='input-area'>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" name='phonenumber' id='phonenumber'/>
              </div>

              <div className='input-area'>
                <label htmlFor="institution">Institution</label>
                <input type="text" name='institution' id='institution' />
              </div>

              <div className='input-area'>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' />
              </div>

            </div>
          </div>
          <div className='btnContainer'>

            <button className='add_btn'>
              <span>Add</span>
            </button>
            
            <button className='cancel_btn'>
              <span>Cancel</span>
            </button>

          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;   