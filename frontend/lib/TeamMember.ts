export class TeamMember {
  image: string;
  name: string;
  title: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  video?: string;

  constructor(image: string, name: string, title: string, bio: string, linkedin: string, twitter: string, email = "", video = "") {
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
