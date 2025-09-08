export const Container = ({children, className}) => {
    return (
        <div className={`flex flex-col md:max-w-[1290px] md:mx-auto px-md md:px-xl ${className}`}>
            {children}
        </div>
    )
}