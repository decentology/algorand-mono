function Links(props) {
  return (
    <ol>
      {props.list.map((link, index) => {
        if (link.children) {
          return (
            <li key={index}>
              <h6>{link.title}</h6>
              <Links list={link.children} />
            </li>
          );
        } else {
          return (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.title}
              </a>
              {link.source &&
                <span className="tag">
                  {link.source}
                </span>
              }
            </li>
          );
        }
      })}
    </ol>
  );
}

export default Links;