             {
               this.props.nav.map((val, idx) => {
                 return <li key={idx}>
                           <a onClick={()=>this.props.getCategory(val.name,val._id)}
                              className={val.name === this.props.activeItem? 'active': null}
                           >
                              {val.name == "Home" ? "首页" : val.name}
                          </a>
                        </li>;
               })
             }
