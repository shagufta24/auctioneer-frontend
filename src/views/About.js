import { Stack, Text } from '@chakra-ui/react';

export default function About() {
  return (
    <Stack spacing={3} p={8}>
      <Text fontSize="2xl" textAlign={'center'}>
        ABOUT
      </Text>
      <Text fontSize="md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat eros,
        egestas quis ante vel, gravida vulputate elit. Phasellus in ex eget
        metus consequat accumsan. Vivamus sed nisi diam. Quisque ac lorem vel
        velit pellentesque ornare. Vivamus imperdiet posuere semper. Phasellus
        fermentum eleifend sem ut ornare. Curabitur et auctor purus, eget
        euismod lorem. Suspendisse commodo rhoncus auctor. Aliquam erat
        volutpat. Phasellus condimentum nisl vitae sem placerat, vitae
        consectetur lacus facilisis.
      </Text>
      <Text fontSize={'md'}>
        Aliquam ac ex erat. Vestibulum suscipit purus at augue accumsan, eget
        interdum est venenatis. In massa nunc, pulvinar vel magna imperdiet,
        laoreet lobortis purus. Morbi pharetra euismod massa eget tincidunt.
        Nulla id laoreet est. Phasellus pellentesque porta risus. Phasellus
        laoreet ut est nec pellentesque. Ut eu scelerisque sem. Nulla finibus
        interdum turpis ut iaculis. Aenean venenatis erat et felis vehicula, et
        placerat ex dictum. Mauris venenatis turpis ipsum, vitae tempus ante
        malesuada eu. Ut ante magna, congue eget leo nec, gravida tempus massa.
        Duis semper finibus tortor porttitor sagittis.
      </Text>
      <Text fontSize={'md'}>
        Sed vel dolor egestas, egestas lectus vel, tempor eros. Maecenas vitae
        velit ac dolor vehicula tempor. Nunc dignissim viverra ipsum quis
        dictum. Vestibulum risus nisl, blandit sed arcu at, interdum blandit
        leo. Pellentesque eget mi in nibh ullamcorper vulputate ut sit amet
        nisl. Integer laoreet egestas sollicitudin. Suspendisse fermentum lorem
        at nibh tristique bibendum. Pellentesque sed tortor lorem. Cras quis
        imperdiet turpis, condimentum eleifend urna. Fusce nec justo justo.
        Praesent malesuada id urna at posuere. Nullam finibus ac eros in
        convallis. Curabitur magna erat, ornare eu lectus suscipit, blandit
        dapibus mi. Fusce eleifend in neque in convallis. Morbi tincidunt nunc
        in tristique lacinia. Quisque eu egestas ante. Mauris ultrices volutpat
        magna nec molestie.
      </Text>
    </Stack>
  );
}
