
const MainLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex-center relative">
        {children}
    </div>
  );
}

export default MainLayout;