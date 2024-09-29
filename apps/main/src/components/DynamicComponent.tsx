import * as Components from "@/components/components";

export const DynamicComponent = ({ item, imgTitle }: any) => {
  const Component: any = (Components as any)[item.name] as any; // Find the component

  if (!Component) return null; // Handle case where component doesn't exist

  return <Component {...item.props} imgTitle={imgTitle} />; // Render the component with props
};
