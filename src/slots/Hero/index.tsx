import React, { type FC, useMemo } from 'react';

import {
  Container,
  Text,
  Center,
  HStack,
  Button,
  Image,
  Icon,
  Link
} from '@chakra-ui/react';
import { VscGithub as Github } from 'react-icons/vsc';
import { SiDiscord as Discord, SiGitlab as GitLab } from 'react-icons/si';
import HeroTitle from '../HeroTitle';

import useHero from '../../hooks/useHero';

import { isOutLink, isEmpty } from '../../factory/tools';

export type HeroConfig = {
  /**
   * @description whether show version badge
   * @description.zh-CN 是否展示版本标签
   */
  showVersionBadge?: boolean;
};

const icons = {
  github: <Icon as={Github} />,
  gitLab: <Icon as={GitLab} />,
  discord: <Icon as={Discord} />
};

const ActionLeftIcon: FC<{ icon: string }> = ({ icon }) =>
  // @ts-ignore
  icons[icon] ?? <Image src={icon} alt="action button left icon" />;

const Hero: FC = () => {
  const { config, ...hero } = useHero();

  const { actions, description, subDescription, icon } = hero ?? {};

  const showActionButtons = useMemo<boolean>(() => {
    return !!actions?.length;
  }, [actions]);

  if (isEmpty(hero)) return null;

  return (
    <Container
      data-config={config}
      maxW="container.xxl"
      p={{ base: 10, md: 16 }}
    >
      {icon && (
        <Center>
          <Image src={icon} alt="pic" />
        </Center>
      )}
      <HeroTitle />
      <Center>
        <Text
          fontSize="2xl"
          textAlign="center"
          fontWeight="semibold"
          p={{ base: 4, md: 4 }}
          pt={4}
        >
          {description}
        </Text>
      </Center>
      {subDescription && (
        <Center>
          <Text fontSize="xl" textAlign="center" pb="4">
            {subDescription}
          </Text>
        </Center>
      )}
      {showActionButtons && (
        <Center>
          <HStack wrap="wrap">
            {actions!.map(({ icon, text, link }, index) => {
              const ActionButton = (
                <Button
                  key={index}
                  size="lg"
                  variant={!index ? 'solid' : 'outline'}
                  colorScheme={!index ? 'brand' : undefined}
                  leftIcon={icon ? <ActionLeftIcon icon={icon} /> : undefined}
                  mb="var(--chakra-space-2)!important"
                >
                  {text}
                </Button>
              );

              if (link) {
                return isOutLink(link) ? (
                  <a href={link} target="_blank" rel="noreferrer" key={index}>
                    {ActionButton}
                  </a>
                ) : (
                  <Link key={index} href={link}>
                    {ActionButton}
                  </Link>
                );
              }

              return ActionButton;
            })}
          </HStack>
        </Center>
      )}
    </Container>
  );
};

export default Hero;
