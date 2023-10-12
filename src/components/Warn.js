import React, { useState } from 'react'

function Warn({handlewarn}) {
  return (
    <div className={'w-full bg-transparent backdrop-blur-mf flex justify-center items-center absolute top-0 left-0 flex-col'}>
        <div className='w-full lg:w-1/2 flex-col space-y-3 lg:space-y-6 bg-slate-300 p-4 rounded-lg text-black lg:mt-3'>
            <p>You are accessing a Indonesian Goverment (I.G) Information System (IS) that is provided for IG-authorized use only. By using this IS (which includes any device attached to this IS), you consent to the following conditions:</p>

            <p>- The IG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.</p>

            <p>- At any time, the IG may inspect and seize data stored on this IS.</p>

            <p>- Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any IG-authorized purpose.</p>

            <p>- This IS includes security measures (e.g., authentication and <span onClick={()=>handlewarn()}>access</span> controls) to protect IG interests -- not for your personal benefit or privacy.</p>

            <p>- Not with standing the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.</p>
            <button className='bg-green-500 text-white rounded-lg px-2 py-1' onClick={()=>window.location.href='https://www.google.com'}>I Understand</button>
        </div>
    </div>
  )
}

export default Warn