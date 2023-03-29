import useDeletePost from "@/hooks/useDeletePost";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const IndividualPost = ({ post }: { post: any }) => {
  const myHtml = `<div style="color: "#fffafad2";fontSize: 30px;">${post.content.rendered}</div`;
  const { deletePost } = useDeletePost();

  const handleDelte = () => {
    deletePost(post.id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 5,
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: `url("/Images/blog4.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#1010105f",
          gap: 3,
          p: 3,
          width: { xs: "95%", md: "50%" },
          borderRadius: "10px",
        }}
      >
        <List component="nav" aria-label="mailbox folders">
          <Box>
            <Typography
              textAlign={"center"}
              mb={5}
              color="#fffafad2"
              fontSize={60}
              variant="h1"
            >
              {post.title.rendered}
            </Typography>
          </Box>

          <ListItem button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Typography fontWeight={700} color="#fffafad2">
                Post description:
              </Typography>

              <div dangerouslySetInnerHTML={{ __html: myHtml }}></div>
            </Box>
          </ListItem>
          <ListItem button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Typography fontWeight={700} color="#fffafad2">
                Post status:
              </Typography>
              <Typography color="#fffafad2">{post.status}</Typography>
            </Box>
          </ListItem>
          <ListItem button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Typography fontWeight={700} color="#fffafad2">
                Publication date:{" "}
              </Typography>
              <Typography color="#fffafad2">{post.date}</Typography>
            </Box>
          </ListItem>
          <ListItem button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Typography fontWeight={700} color="#fffafad2">
                Post ID:
              </Typography>
              <Typography color="#fffafad2">{post.id}</Typography>
            </Box>
          </ListItem>
          <ListItem button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Typography fontWeight={700} color="#fffafad2">
                Author:
              </Typography>
              <Typography color="#fffafad2">{post.author}</Typography>
            </Box>
          </ListItem>
        </List>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <Button onClick={() => handleDelte()} color="error" variant="contained">
          <DeleteForeverIcon
            sx={{
              fontSize: "17px",
            }}
          />
          <Typography fontSize={"13px"} ml={2}>
            Delete post
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ params }: any) {
  const results = await fetch(
    `http://localhost/wordpress/wp-json/wp/v2/posts/${params.id}`
  );
  const post = await results.json();
  return { props: { post } };
}

export default IndividualPost;
