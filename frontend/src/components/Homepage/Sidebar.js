import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { GlobalStates } from "../../GlobalStates";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
    const {
        actions:{updateCategory},
    } = useContext(GlobalStates);
    const [load, setLoad] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
            setCategories(data.categories);
            console.log(data);
            setLoad(true);
        })
    }, []);

    // console.log(categories);
    // console.log(load);
    return(
        <StyledSidebar>
            {load && categories !== undefined &&
            categories.map((category) => {
                {/* console.log(category); */}
                return(
                    <StyledLink to={"/"} onClick={(e) => {updateCategory({data:category})}}>{category}</StyledLink>
                )}
            )}
        </StyledSidebar>
    );
};

export default Sidebar;

const StyledSidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    padding: 10vh 2vw 0 4vw;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
`;

const StyledLink = styled(Link)`
    align-items: center;
    margin: 10px 0 10px;
    padding: 4px 8px 4px 8px;
    border-radius: 20px;
    width: max-content;
    font-size: 20px;
    border: none;
    text-decoration: none;
    background-color: lightblue;

&:hover {
    color: var(--color-font-header);
    background-color: #EFE9FE;
}

`;
