import react from 'react'
import './Header.css'

const Header = () => {
    return(
        <header>
            <div className="logosec">
                <div className="logo">Geeks for Geeks</div>
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png" class="icn menuicn"
                    id="menuicn"
                    alt="menu-icon"></img>
            </div>
            <div className="searchbar">
                {/* this is the seach bar */}
                <input type="text" placeholder="Search" />
                <div className="searchbtn">
                    {/* for search bar button img */}
                    <img className="icn srchicn" src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png" alt="search-icon"/>
                </div>
            </div>
            <div>
                <div></div>
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"/>
                <div>
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"/>
                </div>
            </div>
        </header>
    )
}

export default Header