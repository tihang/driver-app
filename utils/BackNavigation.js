import React from 'react';
import styled from 'styled-components';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function BackNavigation({ route, navigation }) {
   return (
      <NavWrapper>
         <FeatherIcon
            name="chevron-left"
            size={30}
            color="#4a4e69"
            onPress={() => navigation.goBack()}
         />
         <RouteHeading>{route ? route.name : null}</RouteHeading>
      </NavWrapper>
   );
}

const NavWrapper = styled.View`
   padding: 10px;
`;

const RouteHeading = styled.Text`
   font-weight: 600;
   font-size: 24px;
   margin: auto;
   text-align: center;
`;
