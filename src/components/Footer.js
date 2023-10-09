import React from 'react'

const Footer = () => {
  return(
    <div className="footer-dark" id='footer'>
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3 item">
                        <h3 className='li'>Services</h3>
                        <ul>
                            <li><a className='li' href="/">Web design</a></li>
                            <li><a className='li' href="/">Development</a></li>
                            <li><a className='li' href="/">Hosting</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3 className='li'>About</h3>
                        <ul>
                            <li><a className='li' href="/">Company</a></li>
                            <li><a className='li' href="/">Team</a></li>
                            <li><a className='li' href="/">Careers</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 item text">
                        <h3 className='li'>Company Name</h3>
                        <p className='li'>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </div>
                    <div className="col item social"><a href="/"><i className="icon ion-social-facebook"></i></a><a href="/"><i className="icon ion-social-twitter"></i></a><a href="/"><i className="icon ion-social-snapchat"></i></a><a href="/"><i className="icon ion-social-instagram"></i></a></div>
                </div>
                <p className="copyright text-center li">Company Name © 2018</p>
            </div>
        </footer>
    </div>
  )
}
export default Footer;
