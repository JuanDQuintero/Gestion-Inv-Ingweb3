import { useQuery } from "@apollo/client";
import { GET_MATERIALS } from "graphql/client/materials";
import { ExtendedMaterial } from "types";

const useMaterialData = () => {

    const {data, loading} = useQuery<{materials: ExtendedMaterial[]}>(GET_MATERIALS, {fetchPolicy: "cache-first"});
    
    const dataMaterials = data?.materials;    
    
    return { dataMaterials, loading };
}

export{ useMaterialData };