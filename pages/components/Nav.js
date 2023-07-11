import { Navbar, Button, Link, Text, useTheme, User } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/outline"
import { BeakerIcon } from '@heroicons/react/solid'
import { Tooltip } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react" ;
import { LogoutIcon } from  '@heroicons/react/outline'
import { signOut, signIn , useSession } from "next-auth/react";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { EyeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/solid';


export default function Nav() {
  function handleOpenSlideOver() {
    setIsSlideOverOpen(true);
  }

  function handleCloseSlideOver() {
    setIsSlideOverOpen(false);
  }

  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const router = useRouter();
  const collapseItems = [
  ];
  const { isDark } = useTheme();
   const [theme, setTheme] = useState("light")

   const [iconEnabled, setIconEnabled] = useState(true);

  const { data: session } = useSession();

  console.log(session); 

  return (
     
    <Navbar  isBordered={isDark} variant="sticky">
       {router.pathname === '/' && (
          <Navbar.Brand>
          <Text b color="inherit" >
            HuCo
          </Text>
        </Navbar.Brand>
       )}
       {router.pathname === '/System' && (
        <Navbar.Brand>
             <div>
        <button onClick={handleOpenSlideOver}>
        
        <SearchIcon className="block lg:hidden h-6 w-6 text-black"/>
        </button>
        <SlideOver isOpen={isSlideOverOpen} onClose={handleCloseSlideOver} />
      </div>
    
        </Navbar.Brand>
        )}
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link style={{ color: 'black' }} href="#"> </Navbar.Link>
          <Navbar.Link style={{ color: 'black' }}  href="#"></Navbar.Link>
          <Navbar.Link style={{ color: 'black' }} href="#"></Navbar.Link>
          <Navbar.Link style={{ color: 'black' }} href="#"></Navbar.Link>
        </Navbar.Content>

        <Navbar.Content>
          
          {session ? (
                <>
                  <Link href="System">

                  <Tooltip content= "System" color="invert" placement="bottom">
                   <EyeIcon className="h-6 w-6 text-black"/>
                   </Tooltip>
                   </Link>
                   <Link href="Hub">
                   <Tooltip content= "Hub" color="invert" placement="bottom">
                   <BeakerIcon className="h-6 w-6 text-black" />
                   </Tooltip>
                   </Link>

           
             <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <img
                src={session?.user?.image}
                alt="profile pic"
                className="h-10 rounded-full cursor-pointer"
              />
                   </Dropdown.Trigger>
                   <Dropdown.Menu color="invert" aria-label="Avatar Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                 {session?.user?.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              Profile
            </Dropdown.Item>
            <Dropdown.Item key="team_settings"> Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            
            <Dropdown.Item key="Sign out"  withDivider > 
            
               <LogoutIcon className="h-6 w-6" onClick={ signOut } /> 
              
            </Dropdown.Item>
          </Dropdown.Menu>
            </Dropdown>

          </>
          ): (
            
           
            <UserIcon className="h-6 w-6 " onClick={ signIn } />
       
      
          )
          }
          
        
        
     </Navbar.Content>
    
     
     <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              
              {item}
            </Link>
          

          </Navbar.CollapseItem>
        ))}
        <Navbar.CollapseItem>
          <Link style={{ color: 'black' }}  auto flat as={Link} onClick={ signIn }>
            
          </Link>
          </Navbar.CollapseItem>
      </Navbar.Collapse>
      
      </Navbar>   
    
  )
}


