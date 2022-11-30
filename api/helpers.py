def format_response(info_type: str) -> str:
    if info_type == "animal":
        return "Animals are really cool!"
    elif info_type == "color":
        return "Red is a very strong color!"
    else:
        return "Emotions affect the way you learn!"