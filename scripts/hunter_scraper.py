from bs4 import BeautifulSoup
import requests
import json

hunter_catalog = requests.get("https://hunter.cuny.edu/students/campus-life/student-clubs/")
hunter_soup = BeautifulSoup(hunter_catalog.text, "html.parser")

# Find the main div containing all club sections
all_club_sections = hunter_soup.find("div", attrs={"id": "acc-group-2"})

if all_club_sections:

    # Dictionary to hold all club information
    club_data = {}
    section_number = 0 
    number_of_clubs = 0
    # Iterate over each section name
    club_section_length =  len(all_club_sections.findAll("button"))
    for idx, section in enumerate(all_club_sections.findAll("button")):
        if idx == club_section_length-1 or idx== club_section_length-2:
            break
        section_name = section.get_text(strip=True)
        section_clubs = []
        section_number+=1 
        # Collect all content and split by <hr> tags
        section_info = all_club_sections.find("div", attrs={"id": f"accordion-panel-2-{idx+1}"})
        content = str(section_info)
        segments = content.split('<hr/>')
        # Find all club entries within this section
        for idx, club_segment in enumerate(segments):
            number_of_clubs+=1
            if(idx == len(segments)-1):
                break
            segment_soup = BeautifulSoup(club_segment, 'html.parser')
            paragraphs = segment_soup.find_all("p")
            club_links = segment_soup.find_all(["ul", "ol"])

            
            current_club_name = ""
            current_club_description = []
            current_club_links = {}

            for p in paragraphs:
                if p.find(["strong", "b"]):
                    current_club_name = p.get_text(strip=True)
                else:
                    current_club_description.append(p.get_text(strip=True))
            for ul in club_links:
                for li in ul.find_all("li"):
                    link_text = li.get_text(strip=True)
                    if ':' in link_text:
                        key, value = map(str.strip, link_text.split(':', 1))
                        current_club_links[key] = value
                        # print(value)
            section_clubs.append({
                "club_name": current_club_name,
                "club_description": (current_club_description),
                "club_links": current_club_links
            })
        club_data[section_name] = section_clubs


    print("Final club data:")
    # print(json.dumps(club_data, indent = 4))
    open('../club_json_files/hunter_clubs.json', 'w').close()
    with open("../club_json_files/hunter_clubs.json", "w") as outfile: 
        json.dump(club_data, outfile)
    print(section_number, number_of_clubs)
else:
    print("No club sections found.")


    