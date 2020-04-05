import React, { Component } from 'react'

class AdminFooter extends Component {
    state = {  }
    render() { 
        return (

            <footer className="footer-area footer--light">
              {/* end /.footer-big */}
              <div className="mini-footer">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="copyright-text">
                        <p>©2020
                          <a style={{cursor:'pointer'}}> E-Kantin Unpar</a>. All rights reserved.
                        </p>
                      </div>
                      {/* <div className="go_top">
                        <span className="icon-arrow-up" />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          );
    }
}
 
export default AdminFooter;