export default function({children})
{
    return <>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}>
            <div
            style={{
                border: "1px solid grey",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)", // Safari support
                width: "50%",
            }}
            className="p-3 text-center text-white"
            >
                {children}
            </div>
        </div> 
    </>
}