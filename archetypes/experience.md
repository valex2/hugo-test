---
title: "{{ replace .Name "-" " " | title }}"
# Use .Date as the canonical start date for sorting
date: {{ .Date }}            # start date (ISO, used for sort)
start: {{ .Date }}           # start date (ISO string)
end: ""                      # end date (ISO string) — leave blank for "Present"
summary: ""
type: "experience"
cover: ""                    # /images/your-cover.jpg or https://...
experience_tags: []
external: ""                 # optional external link for the card/title
draft: true
---
A few sentences about your role and impact…
