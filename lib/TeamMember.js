export class TeamMember {
  constructor(image, name, title, bio, linkedin, twitter, email = "", video = "") {
    this.image = image;
    this.name = name;
    this.title = title;
    this.bio = bio;
    this.linkedin = linkedin === "" ? undefined : linkedin;
    this.twitter = twitter === "" ? undefined : twitter;
    this.email = email === "" ? undefined : `mailto:${email}`;
    this.video = video === "" ? undefined : video;
  }
}
