import { EmojiHappyIcon, PlusCircleIcon, XIcon } from "@heroicons/react/outline";
import {useRef, useState} from "react";
import { Picker } from 'emoji-mart'
import { useSession  } from "next-auth/react";
import { 
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
 } from "firebase/firestore";
import {  getDownloadURL, ref, uploadString } from "firebase/storage";
import {  db, storage } from '../../firebase'; 


function Input(){
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false)
    const filePickerRef = useRef(null);
    const { data: session } = useSession();
    console.log(session);   
    const [loading, setLoading] = useState(false)
    const sendPost = async () => {
        if(loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db,'posts'), {
       // id: session.user.uid,
       // username: session.user.name,
        //userImg: session.user.image,
       // tag: session.user.tag,
        email: session?.user?.email,
        text: input,
        timestamp: serverTimestamp(),       
        });       
        const imageRef = ref(storage, `posts/${docRef.id}/image`);  
        if(selectedFile) {
            await uploadString(imageRef,selectedFile,"data_url").then( async () => {
                const downloadURL = await getDownloadURL(imageRef);
                
                    await updateDoc(doc(db,"posts", docRef.id),{
                        image: downloadURL,
                    });
            });
        }           
        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    };
    const addShitToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
    }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };
    //const addEmoji = (e) => {
      //  const picker = new Picker();
      //  let sym = e.unified.split("-");
      //  let codesArray = [];
       // sym.forEach((el) => codesArray.push("0x" + el));
      //  let emoji = String.fromCodePoint(...codesArray);
      //  setInput(input + emoji);
    // }; 
    return (
        <div className={'border-b border-black-700 p-3 flex space-x-3 overflow-y-scroll $ { loading && "opacity-60} '}>
            <div className="w-full divide-y divide-black-700">
                <div className={'${selectedFile && "pb-7"} ${ input && "space-y-2.5"}'}>
                     <textarea 
                     
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                     rows="2" 
                     placeholder="Write here" 
                     className="bg-transparent outline-none text=black text-lg placeholder-gray-500  tracking-wide w- ful min-h-[50px]"
                      />
                     {selectedFile && (
                     <div className="relative">
                        <div className="absolute w-8 h-8 bg-grey hover:bg-black bg-opacity-75 rounded-full flex items-center ustify-center top-1 left-1 cursor-pointer" onClick={() => setSelectedFile(null)}>
                            <XIcon className="text-white h-5"/>

                        </div>
                        <img src={selectedFile}
                            alt=""  
                            className="rounded-2xl max-h-80 object-contain"/>
                     </div>
                    ) }
                     </div>

                
                     <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                            <div className="icon" onClick={() => filePickerRef.current.click()}>
                                <PlusCircleIcon className="h-[22px] text-black navbtn"/>
                                <input
                                  type="file"
                                  hidden
                                  onChange={addShitToPost}
                                  ref={filePickerRef}
                                  />
                                  </div>
                            
                     {//showEmojis && (
                          //<Picker 
                          //  onSelect={addEmoji}
                          //   style={{
                          //  position: "absolute",
                          //  marginTop: "465px",
                          //  marginLeft: -40,
                          //  maxWidth: "320px",
                          //  borderRadius: "20px",
                          // }}
                           //theme="dark" />
                      }
                   
                       </div>
                       <button
                          className="bg-black text-white rounded-full px-4
                          py-1.5 font-bold shadow-md hover:bg-black 
                          disabled:hover:bg-grey disabled:opacity-50
                          disabled:cursor-default"
                          disabled={!input.trim() && !selectedFile}
                          onClick={sendPost}
                        >
                            Exought
                        </button>

                     </div>
                
            </div>
        </div>
    );
}

export default Input;