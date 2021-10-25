import { JSDocTag, Project, PropertySignature } from 'ts-morph';
import { ComponentDoc, PropDescriptor } from 'vue-docgen-api';

const project = new Project();

const formatterTags = (jsDocsTags: JSDocTag[]) => {
  const tags: PropDescriptor['tags'] = {};

  jsDocsTags.forEach((tag) => {
    const tagName = tag.getTagName();

    tags[tagName] = [
      {
        title: tagName,
        description: tag.getCommentText(),
      },
    ];
  });

  return tags;
};

const formatterProps = (properties: PropertySignature[]) => {
  const props: PropDescriptor[] = [];

  properties.forEach((p) => {
    const jsDocs = p.getJsDocs()[0];
    if (!jsDocs) {
      return;
    }

    props.push({
      name: p.getName(),
      type: {
        name: p.getTypeNode()?.getText() || '',
      },
      description: jsDocs.getDescription(),
      tags: formatterTags(jsDocs.getTags()),
    });
  });

  return props;
};

export default (filePath: string) => {
  project.addSourceFileAtPath(filePath);

  const sourceFile = project.getSourceFile(filePath);
  const componentDocList: ComponentDoc[] = [];

  if (sourceFile) {
    const interfaces = sourceFile.getInterfaces();
    interfaces.forEach((interfaceDeclaration) => {
      const properties = interfaceDeclaration.getProperties();
      const componentDoc = {
        displayName: interfaceDeclaration.getName(),
        exportName: interfaceDeclaration.getName(),
        props: formatterProps(properties),
      };

      if (componentDoc.props.length) {
        componentDocList.push(componentDoc);
      }
    });
  }

  return componentDocList;
};
