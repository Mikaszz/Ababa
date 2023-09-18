import "@styles/globals.css";
import "@styles/Feed.css";
import "@styles/Nav.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Feed from "@components/Feed";


export const metadata = {
  title: "Top10",
  description: "Top-10 films of all time",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body >
      <Provider>
        
        <div className='main image'>
          
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          
          {children}
        </main>  
      </Provider>
      
      
    </body>
  </html>
);

export default RootLayout;
