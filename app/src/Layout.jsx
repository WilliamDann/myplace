import Error from './components/Error'
import Message from './components/Message'

export default function Layout({error, message, children}) {
  return (
    <>
    <Error message={error} />
    <Message message={message} />
    
    {children}
    </>
  );
}