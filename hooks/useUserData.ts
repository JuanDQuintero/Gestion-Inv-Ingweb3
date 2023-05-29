import { GET_USER } from "graphql/client/users";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { ExtendedUser } from "types";


const useUserData = () => {
    const { data:session, status } = useSession();

    const userEmail = session?.user?.email;
  
    const { data: userData, loading } = useQuery<{user: ExtendedUser} >(GET_USER, {
      variables: {
        email: userEmail,
      },
    });
    
    
    return { userData, loading, session, status, role: userData?.user?.role?.name };
}

export{ useUserData };